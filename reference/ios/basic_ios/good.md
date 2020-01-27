# good
* ios[meta header]
* std[meta namespace]
* basic_ios[meta class]
* function[meta id-type]

```cpp
bool good() const;
```

## 概要
現在の状態値が空であることを判定する。状態値のビットが全く�定されていない場合に真を返す。

## 戻り値
[`rdstate`](rdstate.md)`() == 0`

## 実装例
```cpp
bool good() const {
  return rdstate() == 0;
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
    - `good`（この関数）
    - [`eof`](eof.md)
    - [`fail`](fail.md)
    - [`bad`](bad.md)
    - [`operator bool`](op_bool.md)
    - [`operator void*`](op_voidptr.md)
    - [`operator!`](op_not.md)
