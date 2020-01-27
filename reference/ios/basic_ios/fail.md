# fail
* ios[meta header]
* std[meta namespace]
* basic_ios[meta class]
* function[meta id-type]

```cpp
bool fail() const;
```

## 概要
現在の状態値のうち`failbit`と`badbit`を判定する。

## 戻り値
`failbit`と`badbit`のいずれかまたは両方が�定されていれば`true`、さもなくば`false`。

## 備考
もし、本当に`failbit`のみの判定を行う必要があれば、[`rdstate`](rdstate.md)`()`を使って`(`[`rdstate`](rdstate.md)`() & failbit) != 0`などと記述すればよい。

## 実装例
```cpp
bool fail() const {
  return (rdstate() & (failbit | badbit)) != 0;
}
```
* rdstate[link rdstate.md]

## バージョン
### 言語
- C++98

## 参照
- 状態値の書き込み
    - [`setstate`](setstate.md)
    - [`clear`](clear.md)
- 状態値の�み取り
    - [`rdstate`](rdstate.md)
    - [`good`](good.md)
    - [`eof`](eof.md)
    - `fail`（この関数）
    - [`bad`](bad.md)
    - [`explicit operator bool`](op_bool.md)
    - [`operator!`](op_not.md)
