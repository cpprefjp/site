#clear
* ios[meta header]
* std[meta namespace]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_ios : public ios_base {
  public:
    void clear(iostate state = goodbit);
  };
}
```

##概要
現在の状態値を消去し、実引数で指定した状態に設定する。

##効果
状態値を`state`にする。
ただし、`rdbuf() == nullptr`であれば、さらに`ios_base::bad_bit`をビットORした値にする。

##例外

変更後の状態値のビットと`exceptions()`で設定した値でビットごとのANDを行って非0になれば、`basic_ios::failure`型の例外を送出する。
その際、`basic_ios::failure`のコンストラクタに渡される文字列は、処理系定義である。

##実装例
```cpp
void clear(iostate state = goodbit) {
  iostate newstate = rdbuf() != nulptr
    ? state
    : state | badbit;

  // 後でrdstate()から読み取れるよう、ここでbasic_iosのメンバ変数にnewstateを書き込む。

  if ((state & exceptions()) != 0) {
    throw failure("basic_ios::failure");
  }
}
```

##戻り値
なし

##バージョン
###言語
- C++98

##参照
- 状態値の書き込み
    - [`setstate`](setstate.md)
    - `clear`（この関数）
- 状態値の読み取り
    - [`rdstate`](rdstate.md)
    - [`good`](good.md)
    - [`eof`](eof.md)
    - [`fail`](fail.md)
    - [`bad`](bad.md)
    - [`explicit operator bool`](op_bool.md)
    - [`operator!`](op_not.md)
