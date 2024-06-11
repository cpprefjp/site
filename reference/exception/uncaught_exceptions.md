# uncaught_exceptions
* exception[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  int uncaught_exceptions() noexcept; // C++17
}
```

## 概要
キャッチされていない例外の数を取得する。


## 戻り値
呼び出し時点の、そのスレッドにおいてスローされたがキャッチされていない例外オブジェクトの数を取得する。

具体的には、`try`ブロック中で作られたオブジェクトのデストラクタや、スタック巻き戻し(unwind)中のデストラクタで1以上になる。


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <exception>

struct CheckExcept {
  ~CheckExcept() {
    std::cout << std::uncaught_exceptions() << std::endl;
  }
};

struct ThrowAgain {
  ~ThrowAgain() {
    try {
      CheckExcept two{};

      std::cout << "throw exception 2" << std::endl;
      throw std::exception{};
    } catch(...) {
      std::cout << "catch exception 1" << std::endl;
    }
  }
};

int main() {
  CheckExcept zero{};

  try {
    CheckExcept one{};
    ThrowAgain two{};

    std::cout << "throw exception 1" << std::endl;
    throw std::exception{};
  } catch(...) {
    std::cout << "catch exception 2" << std::endl;
  }
}
```
* std::uncaught_exceptions[color ff0000]
* std::exception[link exception.md]

### 出力
```
throw exception 1
throw exception 2
2
catch exception 1
1
catch exception 2
0
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 6 [mark verified]
- [GCC](/implementation.md#gcc): 3.7 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2015 [mark verified], 2017 [mark verified]

## 参照
- [C++1z 現在発生している例外の数を取得するuncaught_exceptions()関数 - Faith and Brave - C++で遊ぼう](https://faithandbrave.hateblo.jp/entry/2016/06/22/171639)
- [N4152 uncaught_exceptions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4152.pdf)
- [N4259 Wording for std::uncaught_exceptions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4259.pdf)
- [CWG 2098 Is uncaught_exceptions() per-thread?](https://wg21.cmeerw.net/cwg/issue2098)
