# ws
* istream[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits>
  basic_istream<CharT, Traits>& ws(basic_istream<CharT, Traits>& is);
}
```

## 概要
（非書式化入力関数）空白文字を読み捨てるマニピュレータ。

書式化入力関数の前処理と同じ手順で、空白文字を読み捨てる処理を実行する。

## 効果
1. `sentry`オブジェクトを構築する。`sentry`オブジェクトが失敗を示した場合、何もしない。
1. 空白文字が続く間、ストリームから文字を入力する。
    - EOFに達した場合、`setstate(eofbit)`を呼び出す。

## 戻り値
`is`

## 例
```cpp
#include <iostream>
#include <sstream>
#include <string>

int main() {
    // マニピュレータとして使用
    {
        std::istringstream ss("   42");
        std::string line;
        std::getline(ss >> std::ws, line);
        std::cout << line << std::endl; // "42"
    }

    // 関数として使用（通常はしない）
    {
        std::istringstream ss("   42");
        std::cout << ss.tellg() << std::endl; // "0"
        std::ws(ss);
        std::cout << ss.tellg() << std::endl; // "3"
    }
}
```

### 出力
```
42
0
3
```

## バージョン
### 言語
- C++98

## 参照
