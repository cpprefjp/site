# format
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* enum[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  enum path::format {
    native_format,
    generic_format,
    auto_format
  };
}
```

## 概要
`format`は、パス文�列のフォーマットを指定する際に使用する列挙型である。それぞれの列挙�は、以下の意味を持つ：

| 列挙� | 説明 |
|--------|------|
| `native_format` | システム依�のパスフォーマット。<br/> POSIXベースシステムであればディレクトリ区切り文�が `'/'` (スラッシュ)、<br/> Windowsであればディレクトリ区切り文�が `'\\'` (バックスラッシュ) となる |
| `generic_format` | システム非依�のパスフォーマット。ディレクトリ区切り文�が `'/'` (スラッシュ) となる |
| `auto_format` | パス文�列を解析して、パスフォーマットを自動検出するために使用する |


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):


## 参照
- [P0430R2 - File system library on non-POSIX-like operating systems](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0430r2.pdf)
