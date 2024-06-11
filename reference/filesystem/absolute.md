# absolute
* filesystem[meta header]
* std::filesystem[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  path absolute(const path& p);                      // (1)
  path absolute(const path& p, std::error_code& ec); // (2)
}
```
* path[link path.md]

## 概要
パスを絶対パスに変換する。


## 効果
オペレーティング・システムに応じて、パス`p`と同じ場所を指す絶対パスを構築する。

(2)では、エラーが発生した場合、`ec`にエラー情報を書き込む。エラーが発生しなかった場合は、`ec`のエラー情報をクリアする。


## 戻り値
構築された絶対パスを返す。

(2)では、エラーが発生した場合は`path()`を返す。


## 例外
- (1) : ファイルシステムがエラーを報告する場合がある。それに加えて、指定されたファイルが存在しない場合もエラーである。エラーが発生した場合は、[`std::filesystem::filesystem_error`](filesystem_error.md)例外を送出する
- (2) : 仕様上は未規定だが、パスのメモリ確保で例外が発生する可能性がある


## 備考
- エラーが発生しない限り、この関数によって返されたパス`rp`は、`rp.`[`is_absolute()`](path/is_absolute.md) `== true`である
- シンボリックリンクの解決や、セカンダリ・ハードディスクへのクエリが必要な場合には、[`canonical()`](canonical.md)関数の使用を検討すること
- 実装に対して、パス`p`にファイルが存在することをチェックしないよう強く推奨しており、`!`[`exists`](exists.md)`(p)`であってもエラーにはならない
- POSIXベースシステムでの実装は、単純に[`current_path()`](current_path.md)`/p`となる。Windowsの場合は、`GetFullPathNameW()`関数と同じ意味論となる


## 例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  // 現在の作業ディレクトリ直下の (存在しない) ファイル"a.txt"の、絶対パスを取得する
  fs::path p = fs::absolute("a.txt");
  std::cout << p << std::endl;
}
```
* fs::absolute[color ff0000]

### 出力例
```
"/home/my_app/a.txt"
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0 [mark verified]
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp):
