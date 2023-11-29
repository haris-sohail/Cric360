import javax.swing.*;
import java.awt.*;
import java.sql.*;

public class UserOperations {
    private String userType;

    public UserOperations(String userType){
        this.userType = userType;
    }

    public boolean checkCaptain(String username){
        String query = "SELECT * FROM Captain WHERE captainID = ?";

        try (Connection conn = DriverManager.getConnection(Main.connectionString)) {

            try (PreparedStatement stmt = conn.prepareStatement(query)) {
                stmt.setString(1, username);
                try (ResultSet resultSet = stmt.executeQuery()) {

                    while (resultSet.next()) {
                        String captainUsername = resultSet.getString("captainID");

                        if (captainUsername.equals(username)) {
                            return true;
                        }
                    }
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false;
    }

    public void userMainScreen(){
        if(userType.equals("Player")){
            // if the player is captain
            if(checkCaptain(LoginGUI.loggedInUserName)){
                System.out.println("Captain Main menu");
                Captain_MainMenu captainMainMenu = new Captain_MainMenu();
                captainMainMenu.setContentPane(captainMainMenu.getPanelMain());
                captainMainMenu.setSize(400, 400);
                captainMainMenu.setLocationRelativeTo(null);
                captainMainMenu.setVisible(true);
                captainMainMenu.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            }
            else{
                System.out.println("Player Main menu");
                Player_MainMenu playerMainMenu = new Player_MainMenu();
                playerMainMenu.setContentPane(playerMainMenu.getPanelMain());
                playerMainMenu.setSize(400, 400);
                playerMainMenu.setLocationRelativeTo(null);
                playerMainMenu.setVisible(true);
                playerMainMenu.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            }


        }
        else if(userType.equals("Enthusiast")){
            System.out.println("Enthusiast Main menu");
            Enthusiast_MainMenu enthusiastmainmenu = new Enthusiast_MainMenu();
            enthusiastmainmenu.setContentPane(enthusiastmainmenu.getPanelMain());
            enthusiastmainmenu.setSize(400, 400);
            enthusiastmainmenu.setLocationRelativeTo(null);
            enthusiastmainmenu.setVisible(true);
            enthusiastmainmenu.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        }
        else if(userType.equals("MatchOfficial")){
            System.out.println("Match Official Main menu");
            MatchOfficial_MainMenu matchOfficialMainMenu = new MatchOfficial_MainMenu();
            matchOfficialMainMenu.setContentPane(matchOfficialMainMenu.getPanelMain());
            matchOfficialMainMenu.setSize(400, 400);
            matchOfficialMainMenu.setLocationRelativeTo(null);
            matchOfficialMainMenu.setVisible(true);
            matchOfficialMainMenu.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        }
    }
}
