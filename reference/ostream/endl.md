#endl
* ostream[meta header]

```cpp
namespace std {
  template<class CharT, class Traits>
  basic_ostream<CharT, Traits>& endl(basic_ostream<CharT, Traits>& os);
}
```

##概要
改行を出力し、バッファをフラッシュする。

C++のストリームには行バッファリングの機能がないため、行バッファリングの模倣として`endl`が多用される。

##効果
1. `os.put(os.widen('\n'))`を呼び出す。
1. `os.flush()`を呼び出す。

##戻り値
`os`

##例
```cpp
#include <iostream>

int main() {
  std::cout << "Kamaboko" << std::endl;
}
```

###出力
```
Kamaboko
```

##実装例
```cpp
namespace std {
  template<class CharT, class Traits>
  basic_ostream<CharT, Traits>& endl(basic_ostream<CharT, Traits>& os) {
    return os.put(os.widen('\n')).flush();
  }
}
```

##バージョン
###言語
- C++98

##参照
- [flush](flush.md)
