#fail
```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_ios : public ios_base {
  public:
    bool fail() const;
  };
}
```

##概要
現在の状態値のうち`failbit`と`badbit`を判定する。

##戻り値
`failbit`と`badbit`のいずれかまたは両方が設定されていれば`true`、さもなくば`false`。

##備考
もし、本当に`failbit`のみの判定を行う必要があれば、`rdstate()`を使って`(rdstate() & failbit) != 0`などと記述すればよい。

##実装例
```cpp
bool fail() const {
  return (rdstate() & (failbit | badbit)) != 0;
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
    - `fail`（この関数）
    - [`bad`](bad.md)
    - [`explicit operator bool`](op_bool.md)
    - [`operator!`](op_not.md)
