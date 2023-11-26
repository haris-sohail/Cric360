import javax.swing.*;
import java.awt.*;

public class RequestListCellRenderer extends DefaultListCellRenderer {
    @Override
    public Component getListCellRendererComponent(JList<?> list, Object value, int index, boolean isSelected, boolean cellHasFocus) {
        JLabel label = (JLabel) super.getListCellRendererComponent(list, value, index, isSelected, cellHasFocus);

        // Add a button for each request
        JButton approveButton = new JButton("Approve Request");
        label.setLayout(new BorderLayout());
        label.add(approveButton, BorderLayout.EAST);

        // Set the text of the label (request details)
        label.setText(value.toString());

        return label;
    }
}