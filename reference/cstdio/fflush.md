# fflush
* cstdio[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
int fflush(FILE* stream);
```

## 概要
ファイルをフラッシュする。

## 戻り値
正常に終了した場合、バッファーに何も書き込まれていない場合、読み取り専用で開かれている場合は`0`を返す。

それ以外では`EOF`を返す。

## 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??