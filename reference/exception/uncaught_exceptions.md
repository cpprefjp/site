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
呼び出された時点での、スローされたがキャッチされていない例外オブジェクトの数を取得する。
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

## 参照
