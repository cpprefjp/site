# increment
* filesystem[meta header]
* std::filesystem[meta namespace]
* directory_iterator[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
directory_iterator& increment(std::error_code& ec);
```

## 概要
イテレータを進める。


## 効果
コンストラクタで指定された[`std::filesystem::directory_options`](/reference/filesystem/directory_options.md)の値に基づいて、次のファイルを指すようイテレータを進める。

エラーが発生した場合、`ec`にエラー情報が書き込まれる。


## 戻り値
`*this`


## 例
```cpp example
#include <iostream>
#include <filesystem>
#include <fstream>

namespace fs = std::filesystem;

int main()
{
  fs::create_directory("dir");
  std::ofstream{"dir/a.txt"};
  std::ofstream{"dir/b.txt"};

  fs::directory_iterator it{"dir"};

  std::cout << "before : " << it->path() << std::endl;

  std::error_code ec;
  it.increment(ec);

  if (!ec) {
    std::cout << "after  : " << it->path() << std::endl;
  }
  else {
    std::cout << "increment error : " << ec.message() << std::endl;
  }
}
```
* increment[color ff0000]
* fs::create_directory[link /reference/filesystem/create_directory.md]
* it->path()[link /reference/filesystem/directory_entry/path.md]

### 出力
```
before : "dir/b.txt"
after  : "dir/a.txt"
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0 [mark verified]
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp):


## 参照
- [LWG Issue 3013. `(recursive_)directory_iterator` construction and traversal should not be `noexcept`](https://wg21.cmeerw.net/lwg/issue3013)
