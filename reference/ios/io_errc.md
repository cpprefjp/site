#io_errc (C++11)
```cpp
namespace std {
  enum class io_errc {
    stream = 1
  };
}
```

##概要
入出力操作に関するエラー値。列挙値は唯一systemのみが定義されている。

| 列挙値   | 説明                     |
|----------|--------------------------|
| `system` | 入出力操作での失敗を表す |


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md):
- [GCC, C++0x mode](/implementation#gcc.md): ??
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): 10.0, 11.0 （ただし、10.0はenum class非対応のため不完全）


##参照


