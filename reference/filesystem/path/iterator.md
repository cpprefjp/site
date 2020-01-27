# iterator
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* class[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  class path::iterator;
}
```

## 概要
`iterator`は、[`path`](../path.md)クラスが保持する汎用フォーマットのパス文�列を、ディレクトリ区切りで走査するイテレータである。

- イテレータが指す値の型`value_type`は[`path`](../path.md)
- このイテレータは、双方向イテレータの要件を満たす
- [`path`](../path.md)オブジェクトに対して非`const`メンバ関数を呼び出すと、全てのイテレータと要素への参照が無効となる

汎用フォーマットのパス名に対して、このイテレータは以下の順に横�する：

- ルート名要素 (含まれていれば)
- ルートディレクトリ要素 (含まれていれば)
- ファイル名まで各要素を進ませる (含まれていれば)
- 末尾に非ルートのディレクトリ区切り文�があれば空要素として走査する

後方の横� (backward traversal) は、前方横� (forward traversal) の逆順に進む。


## 例
### POSIXベースシステムでの例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path p = "/usr/bin/clang";

  for (fs::path element : p) {
    std::cout << element << std::endl;
  }
  std::cout << std::endl;

  // 複数の連続したスラッシュはひとつとみなされる
  fs::path p2 = "a////b";
  for (fs::path element : p2) {
    std::cout << element << std::endl;
  }
}
```

#### 出力
```
"/"
"usr"
"bin"
"clang"

"a"
"b"
```


### Windowsでの例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path p = "C:/Program Files/a.txt";

  for (fs::path element : p) {
    std::cout << element << std::endl;
  }
}
```

#### 出力
```
"C:"
"\"
"Program Files"
"a.txt"
```

Windowsでの例は、Visual C++が�式にファイルシステムライブラリをサポートしていないことから、未検証のサンプルコード・出力となっている。


### パスの最後がディレクトリ区切り文�の場合の例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path p = "/a/b/c/";

  for (const fs::path& element : p) {
    std::cout << element << std::endl;
  }
}
```

#### 出力
```
"/"
"a"
"b"
"c"
""
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):


## 関連項目
- [`path::begin()`](begin.md)
- [`path::end()`](end.md)
