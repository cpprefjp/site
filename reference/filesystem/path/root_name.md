# root_name
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
path root_name() const;
```

## 概要
パスが保持しているルート名を取得する。

ルート名は、パス名解決のための開始位置を表す識別子である。これは、ディレクトリ区切り文字を含まない、OS依存もしくは実装定義の文字列であり、代表的な環境では以下のようになる：

- POSIXベースシステム : 空文字列
- Windows : `"C:"`のようなディスクドライブを表す文字列


## 戻り値
汎用フォーマットのパスがルート名を保持している場合、それを返す。そうでなければ空のパスを返す。


## 例
### POSIXベースシステムでの例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path p = "/usr/bin/clang";
  fs::path root_name = p.root_name();

  std::cout << root_name << std::endl;
}
```
* root_name()[color ff0000]


#### 出力
```
""
```


### Windowsでの例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path p = "C:/Program Files/a.txt";
  fs::path root_name = p.root_name();

  std::cout << root_name << std::endl;
}
```
* root_name()[color ff0000]

#### 出力
```
"C:"
```

Windowsでの例は、Visual C++が正式にファイルシステムライブラリをサポートしていないことから、未検証のサンプルコード・出力となっています。


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC, C++17 mode](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):
