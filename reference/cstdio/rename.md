# rename
* cstdio[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int rename( const char* old_filename, const char* new_filename );
}
```

## 概要
指定されたファイル名を新しいファイル名に変更する。

新しいファイル名に既にファイルが存在している場合の動作は処理系依存である。

## 戻り値
成功した場合、`0`を返す。

失敗した場合、`0`以外の値を返す。

## 処理系

- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
