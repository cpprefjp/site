# remove
* cstdio[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int remove( const char* pathname );
}
```

## 概要
指定されたファイルを削除する。

他のプロセスによってファイルが開かれている場合、その動作は処理系依存である。

## 戻り値
成功した場合、`0`を返す。

失敗した場合、`0`以外の値を返す。

## 処理系

- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
