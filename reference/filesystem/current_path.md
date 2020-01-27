# current_path
* filesystem[meta header]
* std::filesystem[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  path current_path();                                            // (1)
  path current_path(std::error_code& ec);                         // (2)

  void current_path(const path& p);                               // (3)
  void current_path(const path& p, std::error_code& ec) noexcept; // (4)
}
```
* path[link path.md]

## 概要
現在の作�ディレクトリを取得・�定する。現在の作�ディレクトリとは、自身のプ�セスに関するディレクトリであり、自身からの相対パスを解決する開始位置である。

- (1), (2) : 現在の作�ディレクトリを取得する
- (3), (4) : 現在の作�ディレクトリを�定する


## 効果
- (3), (4) : パス`p`を、現在の作�ディレクトリとして�定する
    - POSIX環境では、[`chdir()`](https://linuxjm.osdn.jp/html/LDP_man-pages/man2/chdir.2.html)関数を使用する


## 戻り値
- (1), (2) : 現在の作�ディレクトリの絶対パスを、ネイティブフォーマットとして返す
    - POSIX環境では、[`getcwd()`](https://linuxjm.osdn.jp/html/LDP_man-pages/man3/getcwd.3.html)関数を使用する
    - エラーが発生した場合、 (2) では`path()`が返る
- (3), (4) : なし


## 例外
- (1), (3) : ファイルシステムがエラーを報告する場合がある。それに加えて、指定されたファイルが�在しない場合もエラーである。エラーが発生した場合は、[`std::filesystem::filesystem_error`](filesystem_error.md)例外を送出する
- (2) : 仕様上は未規定だが、パスのメモリ確保で例外が発生する可能性がある
- (4) : 投げない


## 備考
- この関数名は、単一のディレクトリ名ではなくパスが返る、ということを強調することを意図して命名された
- 多くのOSでは、現在の作�ディレクトリは、危険なグ�ーバル変数である。サードパーティライブラリやシステムライブラリ、あるいは別のスレッドによって、予期せず変更される可能性がある


## 例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  // 現在の作�ディレクトリを取得
  fs::path p = fs::current_path();
  std::cout << p << std::endl;

  // 現在の作�ディレクトリを�定
  fs::current_path("/");
  std::cout << fs::current_path() << std::endl;
}
```
* fs::current_path[color ff0000]

### 出力例
```
"/home/my_app"
"/"
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0
- [GCC](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
