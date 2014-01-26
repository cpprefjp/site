#endl
```cpp
namespace std {
  template<class CharT, class Traits>
  basic_ostream<CharT, Traits>& ends(basic_ostream<CharT, Traits>& os);
}
```

##概要
ヌル文字を出力する。

##効果
1. `os.put(CharT())`を呼び出す。

##戻り値
`os`

##実装例
```cpp
namespace std {
  template<class CharT, class Traits>
  basic_ostream<CharT, Traits>& endl(basic_ostream<CharT, Traits>& os) {
    return os.put(CharT());
  }
}
```

##バージョン
###言語
- C++98

##参照
