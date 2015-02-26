#rdstate: read state
* ios[meta header]
* std[meta namespace]
* basic_ios[meta class]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_ios : public ios_base {
  public:
    iostate rdstate() const;
  };
}
```

##概要
現在の状態値(`iostate`)を取得する。

##戻り値
現在の状態。

##実装例

##バージョン
###言語
- C++98

##参照
- 状態値の書き込み
    - [`setstate`](setstate.md)
    - [`clear`](clear.md)
- 状態値の読み取り
    - `rdstate`（この関数）
    - [`good`](good.md)
    - [`eof`](eof.md)
    - [`fail`](fail.md)
    - [`bad`](bad.md)
    - [`explicit operator bool`](op_bool.md)
    - [`operator!`](op_not.md)
