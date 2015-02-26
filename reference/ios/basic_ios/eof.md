#eof
* ios[meta header]
* std[meta namespace]
* basic_ios[meta class]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_ios : public ios_base {
  public:
    bool eof() const;
  };
}
```

##概要
現在の状態値のうち`eofbit`を判定する。

##戻り値
`eofbit`が設定されていれば`true`、さもなくば`false`。

##実装例
```cpp
bool eof() const {
  return (rdstate() & eofbit) != 0;
}
```

##バージョン
###言語
- C++98

##参照
- 状態値の書き込み
    - [`setstate`](setstate.md)
    - [`clear`](clear.md)
- 状態値の読み取り
    - [`rdstate`](rdstate.md)
    - [`good`](good.md)
    - `eof`（この関数）
    - [`fail`](fail.md)
    - [`bad`](bad.md)
    - [`explicit operator bool`](op_bool.md)
    - [`operator!`](op_not.md)
