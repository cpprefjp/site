# setstate
* ios[meta header]
* std[meta namespace]
* basic_ios[meta class]
* function[meta id-type]

```cpp
void setstate(iostate state);
```

## 概要
現在の状態値を�定する。
現在の状態に、実引数で指定された値を加えた状態を新しい状態値とする。

## 効果
[`clear`](clear.md)`(`[`rdstate`](rdstate.md)`() | state)` を呼び出す。

結果として、[`exceptions`](exceptions.md)`()` メンバ関数での�定に従い、[`ios_base`](../ios_base.md)`::`[`failure`](../ios_base/failure.md) 例外が送出される可能性がある。

## 戻り値
なし

## 実装例
```cpp
void setstate(iostate state) {
  clear(rdstate() | state);
}
```
* clear[link clear.md]
* rdstate[link rdstate.md]

## バージョン
### 言語
- C++98

## 参照
- 状態値の書き込み
    - `setstate`（この関数）
    - [`clear`](clear.md)
- 状態値の�み取り
    - [`rdstate`](rdstate.md)
    - [`good`](good.md)
    - [`eof`](eof.md)
    - [`fail`](fail.md)
    - [`bad`](bad.md)
    - [`operator bool`](op_bool.md)
    - [`operator void*`](op_voidptr.md)
    - [`operator!`](op_not.md)
- 例外マスクの取得・�定
    - [`exceptions`](exceptions.md)
