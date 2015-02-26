#setstate: set state
* ios[meta header]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_ios : public ios_base {
  public:
    void setstate(iostate state);
  };
}
```

##概要
現在の状態値を設定する。
現在の状態に、実引数で指定された値を加えた状態を新しい状態値とする。

##効果
`clear(rdstate()) | state`を呼び出す。

結果として、`exceptions`メンバ関数での設定に従い、例外が送出される可能性がある。

##戻り値
なし

##実装例
```cpp
void setstate(iostate state) {
  clear(rdstate() | state);
}
```

##バージョン
###言語
- C++98

##参照
- 状態値の書き込み
    - `setstate`（この関数）
    - [`clear`](clear.md)
- 状態値の読み取り
    - [`rdstate`](rdstate.md)
    - [`good`](good.md)
    - [`eof`](eof.md)
    - [`fail`](fail.md)
    - [`bad`](bad.md)
    - [`explicit operator bool`](op_bool.md)
    - [`operator!`](op_not.md)
