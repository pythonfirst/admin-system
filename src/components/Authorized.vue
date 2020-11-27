<script>
import { check } from "../utils/auth";
export default {
  functional: true,
  render(h, context) {
    return check(context.props.role) ? context.scopedSlots : null;
  }
};
</script>

<style></style>
