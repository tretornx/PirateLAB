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
        setContentView(R.layout.activity_main)

        // Configure WebView
        val webView = findViewById<WebView>(R.id.webview)
        webView.settings.javaScriptEnabled = true
        webView.settings.allowFileAccess = true
        webView.webViewClient = WebViewClient()
        webView.addJavascriptInterface(WebAppInterface(this), "Android")
        webView.loadUrl("file:///android_asset/mon_site/index.html") // Page de connexion initiale

        // Initialiser DevicePolicyManager
        devicePolicyManager = getSystemService(Context.DEVICE_POLICY_SERVICE) as DevicePolicyManager
        componentName = ComponentName(this, MyDeviceAdminReceiver::class.java)

        // Vérifie si l'application est admin
        if (!devicePolicyManager.isAdminActive(componentName)) {
            val intent = Intent(DevicePolicyManager.ACTION_ADD_DEVICE_ADMIN)
            intent.putExtra(DevicePolicyManager.EXTRA_DEVICE_ADMIN, componentName)
            intent.putExtra(
                DevicePolicyManager.EXTRA_ADD_EXPLANATION,
                "Veuillez activer cette application comme administrateur pour permettre le verrouillage et l’extinction."
            )
            startActivity(intent)
        }
    }

    inner class WebAppInterface(private val context: Context) {
        @JavascriptInterface
        fun shutdownTablet() {
            if (devicePolicyManager.isAdminActive(componentName)) {
                try {
                    // Simulation d'extinction
                    devicePolicyManager.lockNow() // Verrouille immédiatement
                    Toast.makeText(context, "Tablette verrouillée (extinction simulée).", Toast.LENGTH_SHORT).show()
                } catch (e: Exception) {
                    Toast.makeText(context, "Erreur : ${e.message}", Toast.LENGTH_LONG).show()
                }
            } else {
                Toast.makeText(context, "L'application n'est pas admin de l'appareil.", Toast.LENGTH_LONG).show()
            }
        }
    }
}

