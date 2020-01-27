# relative_path
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
path relative_path() const;
```

## 概要
ルートパスからの相対パスを取得する。


## 戻り値
パスが空でない場合、[ルートパス](root_path.md)を除いたパスを返す。そうでなければ空のパスを返す。


## 例
### POSIXベースシステムでの例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path p = "/usr/bin/clang";

  fs::path root_p = p.root_path();
  fs::path rel_p = p.relative_path();

  std::cout << root_p << std::endl;
  std::cout << rel_p << std::endl;
}
```
* relative_path()[color ff0000]
* p.root_path()[link root_path.md]

#### 出力
```
"/"
"usr/bin/clang"
```


### Windowsでの例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path p = "C:/Program Files/a.txt";

  fs::path root_p = p.root_path();
  fs::path rel_p = p.relative_path();

  std::cout << root_p << std::endl;
  std::cout << rel_p << std::endl;
}
```
* relative_path()[color ff0000]
* p.root_path()[link root_path.md]

#### 出力
```
"C:\"
"Program Files\a.txt"
```

Windowsでの例は、Visual C++が�式にファイルシステムライブラリをサポートしていないことから、未検証のサンプルコード・出力となっている。


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
