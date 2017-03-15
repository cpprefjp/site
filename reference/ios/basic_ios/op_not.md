# operator!
* ios[meta header]
* std[meta namespace]
* basic_ios[meta class]
* function[meta id-type]

```cpp
bool operator!() const;
```

## 概要
現在の状態値が異常を示す値になっていることを判定する演算子関数。

## 戻り値
[`fail`](fail.md)`()`。

## 実装例
```cpp
bool operator!() const {
  return fail();
}
```
* fail[link fail.md]

## バージョン
### 言語
- C++98

## 参照
- 状態値の書き込み
    - [`setstate`](setstate.md)
    - [`clear`](clear.md)
- 状態値の読み取り
    - [`rdstate`](rdstate.md)
    - [`good`](good.md)
    - [`eof`](eof.md)
    - [`fail`](fail.md)
    - [`bad`](bad.md)
    - [`operator bool`](op_bool.md)
    - [`operator void*`](op_voidptr.md)
    - `operator!`（この関数）
