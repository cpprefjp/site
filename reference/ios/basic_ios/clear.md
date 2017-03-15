# clear
* ios[meta header]
* std[meta namespace]
* basic_ios[meta class]
* function[meta id-type]

```cpp
void clear(iostate state = goodbit);
```
* iostate[link ../ios_base/type-iostate.md]
* goodbit[link ../ios_base/type-iostate.md]

## 概要
現在の状態値を消去し、実引数で指定した状態に設定する。

## 効果
状態値を`state`にする。
ただし、[`rdbuf`](rdbuf.md)`() == nullptr`であれば、さらに[`ios_base`](../ios_base.md)`::`[`badbit`](../ios_base/type-iostate.md)をビットORした値にする。

## 例外

変更後の状態値のビットと[`exceptions`](exceptions.md)`()`で設定した値でビットごとのANDを行って非0になれば、[`ios_base`](../ios_base.md)`::`[`failure`](../ios_base/failure.md)型の例外を送出する。  
その際、[`ios_base`](../ios_base.md)`::`[`failure`](../ios_base/failure.md)の[コンストラクタ](../ios_base/failure/op_constructor.md)に渡される引数は、処理系定義である。

## 実装例
```cpp
void clear(iostate state = goodbit) {
  iostate newstate = rdbuf() != nullptr
    ? state
    : state | badbit;

  // 後でrdstate()から読み取れるよう、ここでbasic_iosのメンバ変数にnewstateを書き込む。

  if ((newstate & exceptions()) != 0) {
    throw failure("basic_ios::clear");
  }
}
```
* rdbuf[link rdbuf.md]
* exceptions[link exceptions.md]
* basic_ios[link ../basic_ios.md]
* rdstate[link rdstate.md]
* iostate[link ../ios_base/type-iostate.md]
* goodbit[link ../ios_base/type-iostate.md]
* badbit[link ../ios_base/type-iostate.md]
* failure[link ../ios_base/failure.md]
* ios_base[link ../ios_base.md]

## 戻り値
なし

## バージョン
### 言語
- C++98

## 参照
- 状態値の書き込み
    - [`setstate`](setstate.md)
    - `clear`（この関数）
- 状態値の読み取り
    - [`rdstate`](rdstate.md)
    - [`good`](good.md)
    - [`eof`](eof.md)
    - [`fail`](fail.md)
    - [`bad`](bad.md)
    - [`operator bool`](op_bool.md)
    - [`operator void*`](op_voidptr.md)
    - [`operator!`](op_not.md)
- 例外マスクの取得・設定
    - [`exceptions`](exceptions.md)
