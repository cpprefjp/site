#make_shared(C++11)
```cpp
namespace std {
  template<class T, class... Args>
  shared_ptr<T> make_shared(Args&&... args);
}
```

##概要
`class T` に対する `shared_ptr<T>`オブジェクト を作成し返却する。
このとき、`args...` で受け取った引数リストを型 `T` の作成時コンストラクタへ渡して作成する。

`shared_ptr<T>(new T(args...));` という方法でも構築できるが、これは作成時のメモリ確保が2回行われることからオーバーヘッドが大きくなるという欠点がある。
`make_shared()` はそこを制御し、1つの大きなブロックとして `shared_ptr` 構築に必要なメモリを確保する。

また、コピー不可能なクラスもムーブによって引数リストへ渡すことが可能である。

##例
```cpp
#include <memory>
#include <iostream>
 
int main() {
  std::shared_ptr<int> sp = std::make_shared<int>(42);
  if(sp) {
    std::cout << *sp << std::endl;
  }
}
```

##出力
```
42
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.4
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): 10.0

##備考
VIsual C++ 10.0 でも使用可能だが、Variadic Templates に対応していないため、オーバーロードにより、最大10個の引数を受け取れる形で実装されている。
