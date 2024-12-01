package com.example.piratelab

import android.os.Bundle
import android.webkit.WebView
import android.webkit.WebViewClient
import android.content.Context
import android.content.Intent
import android.app.admin.DevicePolicyManager
import android.content.ComponentName
import android.webkit.JavascriptInterface
import android.widget.Toast
import androidx.activity.ComponentActivity

class MainActivity : ComponentActivity() {
    private lateinit var devicePolicyManager: DevicePolicyManager
    private lateinit var componentName: ComponentName

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        if (System.currentTimeMillis() < getUnlockTime()) {
            Toast.makeText(this, "L'application a été cryptée en urgence.", Toast.LENGTH_LONG).show()
            finish()
            return
        }

        setContentView(R.layout.activity_main)

        // Configure WebView
        val webView = findViewById<WebView>(R.id.webview)
        webView.settings.javaScriptEnabled = true
        webView.settings.allowFileAccess = true
        webView.webViewClient = WebViewClient()
        webView.addJavascriptInterface(WebAppInterface(this), "Android")
        webView.loadUrl("file:///android_asset/mon_site/index.html")

        // Initialiser DevicePolicyManager
        devicePolicyManager = getSystemService(Context.DEVICE_POLICY_SERVICE) as DevicePolicyManager
        componentName = ComponentName(applicationContext, MyDeviceAdminReceiver::class.java)

        // Vérifie si l'application est admin
        if (!devicePolicyManager.isAdminActive(componentName)) {
            val intent = Intent(DevicePolicyManager.ACTION_ADD_DEVICE_ADMIN)
            intent.putExtra(DevicePolicyManager.EXTRA_DEVICE_ADMIN, componentName)
            intent.putExtra(
                DevicePolicyManager.EXTRA_ADD_EXPLANATION,
                "Veuillez activer cette application comme administrateur pour permettre le verrouillage."
            )
            startActivity(intent)
        }
    }

    private fun getUnlockTime(): Long {
        val prefs = getSharedPreferences("AppPrefs", Context.MODE_PRIVATE)
        return prefs.getLong("lockUntil", 0)
    }

    inner class WebAppInterface(private val context: Context) {
        @JavascriptInterface
        fun lockAppForMinutes(minutes: Int) {
            val lockUntil = System.currentTimeMillis() + minutes * 60 * 1000
            val prefs = context.getSharedPreferences("AppPrefs", Context.MODE_PRIVATE)
            prefs.edit().putLong("lockUntil", lockUntil).apply()

            Toast.makeText(context, "L'application a été cryptée en urgence.", Toast.LENGTH_LONG).show()

            finish() // Fermer l'application
        }
    }
}

