# feof
* cstdio[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
int feof(FILE* stream);
```

## 概要
ファイルの終端に達したかを判定する。

## 戻り値
ファイルの終端に達した場合は`0`以外を、そうでなければ`0`を返す。

## 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??