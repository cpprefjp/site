# tmpfile
* cstdio[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  std::FILE* tmpfile();
}
```

## 概要
一時ファイルを生成する。

[`std::fclose`](/reference/cstdio/fclose.md)関数を呼び出すと、一時ファイルは自動的に削除される。

通常終了（[`exit`](/reference/cstdlib/exit.md)関数や`main`関数のreturn文）時には、一時ファイルは自動的に削除される。

それ以外の場合による終了は処理系依存である。

## 戻り値
成功した場合、一時ファイルを指すファイルストリームを返す。

失敗した場合、`NULL`を返す。

## 処理系

- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


