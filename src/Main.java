import javax.swing.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Main {
    public static String connectionString;

    public static void handleSignup(){
        SignUpGUI newSignUp = new SignUpGUI();
        newSignUp.setContentPane(newSignUp.getPanelMain());
        newSignUp.setSize(400,400);
        newSignUp.setLocationRelativeTo(null);
        newSignUp.setVisible(true);
        newSignUp.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    public static void setConnectionString(){
        connectionString = "jdbc:sqlserver://DESKTOP-2BV11P4\\SQLEXPRESS:50143;Database=Cric360;IntegratedSecurity=true;encrypt=false";

    }

    public static void main(String[] args) {
        setConnectionString();
        handleSignup();
    }

}
