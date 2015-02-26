#good
* ios[meta header]
* std[meta namespace]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_ios : public ios_base {
  public:
    bool good() const;
  };
}
```

##概要
現在の状態値が空であることを判定する。状態値のビットが全く設定されていない場合に真を返す。

##戻り値
`rdstate() == 0`

##実装例
```cpp
bool good() const {
  return rdstate() == 0;
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
    - `good`（この関数）
    - [`eof`](eof.md)
    - [`fail`](fail.md)
    - [`bad`](bad.md)
    - [`explicit operator bool`](op_bool.md)
