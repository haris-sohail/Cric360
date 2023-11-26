import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.*;

public class JoinTeamGUI extends JFrame{
    private JPanel panelMain;
    private JComboBox comboSelectTeam;
    private JTextArea txtRequestMsg;
    private JButton btnSend;

    public JoinTeamGUI(){
        loadTeamNames();
        btnSend.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String teamName = getTeamName();
                String requestMsg = txtRequestMsg.getText();
                storeRequestToDB(teamName, requestMsg);
            }
        });
    }

    public String getTeamName(){
        return comboSelectTeam.getSelectedItem().toString();
    }

    public void storeRequestToDB(String teamName, String requestMsg){
        int id = getID();

        String query = "INSERT INTO TeamJoinRequest (requestFor, message, madeByPlayer, id) VALUES (?,?,?,?)";

        try (Connection conn = DriverManager.getConnection(Main.connectionString);
             PreparedStatement stmt = conn.prepareStatement(query)) {

            stmt.setString(1, teamName);
            stmt.setString(2, requestMsg);
            stmt.setString(3, LoginGUI.loggedInUserName);
            stmt.setInt(4, id);

            stmt.executeUpdate();

            // request sent
            JOptionPane.showMessageDialog(panelMain, "Request sent!", "Success", JOptionPane.INFORMATION_MESSAGE);

            // go to player main menu
            UserOperations playerOp = new UserOperations("Player");
            playerOp.userMainScreen();
            dispose();

            // set text fields to blank
            txtRequestMsg.setText("");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public int getID(){
        int idReturn = 0;
        String query = "SELECT MAX(id) AS maxId FROM TeamJoinRequest";

        try (Connection conn = DriverManager.getConnection(Main.connectionString);
             PreparedStatement stmt = conn.prepareStatement(query);
             ResultSet resultSet = stmt.executeQuery()) {

            while (resultSet.next()) {
                idReturn = resultSet.getInt("maxId");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return ++idReturn; // the id of the current request will be incremented than the id of the last made request
    }

    public JPanel getPanelMain() {
        return panelMain;
    }

    private void loadTeamNames() {
        String query = "SELECT name FROM Team";

        try (Connection conn = DriverManager.getConnection(Main.connectionString);
             PreparedStatement stmt = conn.prepareStatement(query);
             ResultSet resultSet = stmt.executeQuery()) {

            while (resultSet.next()) {
                String teamName = resultSet.getString("name");

                // Add team names to the combo boxes
                comboSelectTeam.addItem(teamName);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
