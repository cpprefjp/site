#io_errc (C++11)
* ios[meta header]

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
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc):
- [GCC, C++0x mode](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0 （ただし、10.0はenum class非対応のため不完全）


##参照


