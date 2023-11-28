import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.*;

public class SeeRequestsGUI extends JFrame {
    private JPanel panelMain;
    private JList<String> requestsList;
    private JButton btnGoBack;

    public JPanel getPanelMain() {
        return panelMain;
    }

    public SeeRequestsGUI() {
        // Populate the requests list
        populateRequestsList();
        btnGoBack.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                // go back to player main menu
                UserOperations playerOp = new UserOperations("Player");
                playerOp.userMainScreen();
                dispose();
            }
        });
    }

    private void populateRequestsList() {
        DefaultListModel<String> listModel = new DefaultListModel<>();

        // Execute SQL query
        String query = "SELECT TeamJoinRequest.id, TeamJoinRequest.requestFor, " +
                "COALESCE(RequestResponse.status, 'Pending') AS status " +
                "FROM TeamJoinRequest " +
                "LEFT JOIN RequestResponse ON TeamJoinRequest.id = RequestResponse.replyTo " +
                "WHERE TeamJoinRequest.madeByPlayer = '" + LoginGUI.loggedInUserName + "'";
        try (Connection conn = DriverManager.getConnection(Main.connectionString);
             Statement stmt = conn.createStatement();
             ResultSet resultSet = stmt.executeQuery(query)) {

            // Iterate through the results and add them to the list model
            while (resultSet.next()) {
                int requestId = resultSet.getInt("id");
                String requestFor = resultSet.getString("requestFor");
                String status = resultSet.getString("status");
                listModel.addElement("Request ID: " + requestId + " - Request For: " + requestFor + " - Status: " + status);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        // Set the model for the JList
        requestsList.setModel(listModel);
    }
}
