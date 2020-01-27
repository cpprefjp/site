# relative
* filesystem[meta header]
* std::filesystem[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  path relative(const path& p, std::error_code& ec);                   // (1)
  path relative(const path& p, const path& base = current_path());     // (2)
  path relative(const path& p, const path& base, std::error_code& ec); // (3)
}
```
* path[link path.md]
* current_path()[link current_path.md]

## 概要
パスを現在の作�ディレクトリからの相対パスに変換する。

- (1) : 現在の作�ディレクトリからパス`p`への相対パスを構築する
- (2), (3) : パス`base`からパス`p`への相対パスを構築する


## 戻り値
- (1) : `return relative(p,` [`current_path()`](current_path.md)`, ec);`
- (2) : `return` [`weakly_canonical`](weakly_canonical.md)`(p).`[`lexically_relative`](path/lexically_relative.md)`(`[`weakly_canonical`](weakly_canonical.md)`(base));`
- (3) : `return` [`weakly_canonical`](weakly_canonical.md)`(p, ec).`[`lexically_relative`](path/lexically_relative.md)`(`[`weakly_canonical`](weakly_canonical.md)`(base, ec));`

(1)と(3)でエラーが発生した場合、`ec`にエラー情報が書き込まれ、`path()`が返る。


## 例外
- (1), (3) : 仕様上は未規定だが、パスのメモリ確保で例外が発生する可能性がある
- (2) : ファイルシステムがエラーを報告する場合がある。それに加えて、指定されたパス`p`と`base`のいずれの部分パスも�在しない場合でもエラーである。エラーが発生した場合は、[`std::filesystem::filesystem_error`](filesystem_error.md)例外を送出する


## 例
### POSIXベースシステムでの例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  // 現在の作�ディレクトリからの相対パスに変換する
  fs::path p1 = fs::relative("/a.txt");
  std::cout << p1 << std::endl;

  // 現在の作�ディレクトリからひとつ上の階層からの相対パスに変換する
  fs::path p2 = fs::relative("/a.txt", "../");
  std::cout << p2 << std::endl;
}
```
* fs::relative[color ff0000]

#### 出力
```
"../../a.txt"
"../a.txt"
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0
- [GCC](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
