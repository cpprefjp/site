# tellg
* istream[meta header]
* std[meta namespace]
* basic_istream[meta class]
* function[meta id-type]

```cpp
pos_type tellg();
```

## 概要
（非書式化入力関数）ストリームバッファから現在の�み取り位置を取得する。

非書式化入力関数であるが、後続の`gcount()`呼び出しに影響を及ぼさない点が通常と異なる。

## 効果

1. `sentry`オブジェクトを構築する。
1. 成功した場合、`rdbuf()->pubseekoff(0, cur, in)`を呼び出して戻り値とする。

## 戻り値

- `fail() == false`であれば、`rdbuf()->pubseekoff(0, cur, in)`。
- `fail() == true`であれば、`pos_type(-1)`。

## 例
```cpp example
#include <iostream>
#include <sstream>

int main() {
  std::istringstream is("103 201");
  int x;

  is >> x;
  std::cout << x << std::endl;

  auto pos = is.tellg(); // 現在位置をposに保�。
  is >> x;
  std::cout << x << std::endl;

  is.seekg(pos); // 保�した位置を復元。
  is >> x;
  std::cout << x << std::endl;
}
```
* tellg()[color ff0000]
* std::istringstream[link /reference/sstream/basic_istringstream.md]
* seekg[link seekg.md]

### 出力
```
103
201
201
```

## 実装例
```cpp
pos_type tellg(pos_type pos) {
  try {
    sentry s(*this, true);
    if (s) {
      return this->rdbuf()->pubseekoff(0, cur, ios_base::in);
    }
  } catch (...) {
    例外を投げずにbadbitを�定する;
    if ((this->exceptions() & badbit) != 0) {
      throw;
    }
  }
  return pos_type(-1);
}
```
* sentry[link sentry.md]
* rdbuf()[link /reference/ios/basic_ios/rdbuf.md]
* pubseekoff[link /reference/streambuf/basic_streambuf/pubseekoff.md.nolink]
* exceptions()[link /reference/ios/basic_ios/exceptions.md]
* badbit[link /reference/ios/ios_base/type-iostate.md]

## バージョン
### 言語
- C++98

## 参照

- [`basic_istream::seekg`](seekg.md)
- `basic_streambuf::pubseekoff`
- `basic_streambuf::seekoff`
