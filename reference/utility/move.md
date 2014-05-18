#move (utility) (C++11)
```cpp
namespace std {
  template <class T>
  typename remove_reference<T>::type && move(T&& t) noexcept;
}
```

##概要
左辺値を右辺値にキャストする。

この関数は、渡されたオブジェクトを右辺値参照にキャストし、ムーブセマンティクスを適用させる。


##戻り値
`static_cast<typename std::remove_reference<T>::type &&>(t)`


##例外
投げない


##例
```cpp
#include <iostream>
#include <utility>

struct A {
  A() {}

  // 左辺値からコピー
  A(const A&)
  {
    std::cout << "copy" << std::endl;
  }

  // 右辺値からムーブ
  A(A &&)
  {
    std::cout << "move" << std::endl;
  }
};

int main()
{
  A a;
  A a1 = a;             // A(const A&)が呼ばれる
  A a2 = std::move(a);  // A(A&&)が呼ばれる
}
```
* move[color ff0000]

###出力
```
copy
move
```

上記の`a1`の初期化において、`a`は左辺値なので、コンストラクタ`A(const A&)`が呼び出され、`a1`は`a`からコピーされる。`a2`の初期化においては、`std::move(a)`呼び出しのため、コンストラクタ`A(A&&)`が呼ばれ、`a2`は`a`からムーブされる。

##バージョン
###言語
- C++11


###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照


