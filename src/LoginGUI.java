import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class LoginGUI extends JFrame{
    private JPanel panelMain;
    private JTextField txtUsername;
    private JPasswordField txtPassword;
    private JButton btnLogin;
    private JButton btnSignUp;

    public LoginGUI() {
        btnLogin.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                handleLogin();
            }
        });
    }

    public void handleLogin(){
        String username = txtUsername.getText();
        char[] password = txtPassword.getPassword();

        // Check from database
        if(checkCredentials(username, new String(password))){
            JOptionPane.showMessageDialog(panelMain, "Login successful!", "Success", JOptionPane.INFORMATION_MESSAGE);
            // set text fields to blank
            txtUsername.setText("");
            txtPassword.setText("");
        }
        else{
            JOptionPane.showMessageDialog(panelMain, "Login failed!", "Error", JOptionPane.ERROR_MESSAGE);
            // set text fields to blank
            txtUsername.setText("");
            txtPassword.setText("");
        }
    }

    public boolean checkCredentials(String username, String password){
        try{
            String query = "SELECT type FROM User$ WHERE username = '" + username + "' AND password = '" + password + "'";

            Connection conn = DriverManager.getConnection(Main.connectionString);
            PreparedStatement stmt = conn.prepareStatement(query);

            try (ResultSet resultSet = stmt.executeQuery()) {
                if (resultSet.next()) {
                    // Extract the "type" column value and store it in a String
                    String userType = resultSet.getString("type");

                    // based on the type of the user display main menu
                    UserOperations userOp = new UserOperations(userType);
                    userOp.userMainScreen();

                    return true;
                } else {
                    return false; // User not found
                }
            }
        }
       catch (Exception e){
            System.out.println("Connection Error");
            return false;
       }
    }

    public JPanel getPanelMain() {
        return panelMain;
    }
}
