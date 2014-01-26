#endl
```cpp
namespace std {
  template<class CharT, class Traits>
  basic_ostream<CharT, Traits>& flush(basic_ostream<CharT, Traits>& os);
}
```

##概要
バッファをフラッシュする。

##効果
1. `os.flush()`を呼び出す。

##戻り値
`os`

##例
```cpp
#include <iostream>

int main() {
  std::cout << "Hello world\n" << std::flush;
}
```

##出力
```
Hello world
```

##実装例
```cpp
namespace std {
  template<class CharT, class Traits>
  basic_ostream<CharT, Traits>& flush(basic_ostream<CharT, Traits>& os) {
    return os.flush();
  }
}
```

##バージョン
###言語
- C++98

##参照
- [endl](endl.md)
