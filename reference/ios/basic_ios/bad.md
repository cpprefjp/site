# bad
* ios[meta header]
* std[meta namespace]
* basic_ios[meta class]
* function[meta id-type]

```cpp
bool bad() const;
```

## 概要
現在の状態値のうち`badbit`を判定する。

## 戻り値
`badbit`が設定されていれば`true`、さもなくば`false`。

## 実装例
```cpp
bool bad() const {
  return (rdstate() & badbit) != 0;
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
- 状態値の読み取り
    - [`rdstate`](rdstate.md)
    - [`good`](good.md)
    - [`eof`](eof.md)
    - [`fail`](fail.md)
    - `bad`（この関数）
    - [`operator bool`](op_bool.md)
    - [`operator void*`](op_voidptr.md)
    - [`operator!`](op_not.md)
