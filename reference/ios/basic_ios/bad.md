#fail
* ios[meta header]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_ios : public ios_base {
  public:
    bool bad() const;
  };
}
```

##概要
現在の状態値のうち`badbit`を判定する。

##戻り値
`badbit`が設定されていれば`true`、さもなくば`false`。

##実装例
```cpp
bool bad() const {
  return (rdstate() & badbit) != 0;
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
    - [`eof`](eof.md)
    - [`fail`](fail.md)
    - `bad`（この関数）
    - [`explicit operator bool`](op_bool.md)
    - [`operator!`](op_not.md)
