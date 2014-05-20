#allocate_shared (C++11)
```cpp
namespace std {
  template <class T, class Alloc, class... Args>
  shared_ptr<T> allocate_shared(const Alloc& alloc, Args&&... args);
}
```

##概要
アロケータを指定して`shared_ptr`オブジェクトを構築する。


##戻り値
型`T`に対する `shared_ptr<T>`オブジェクトを、アロケータオブジェクト`alloc`でメモリ確保して生成し、返却する。  
このとき、`args...` で受け取った引数リストを型 `T`のコンストラクタへ渡して`shared_ptr<T>`型のオブジェクトを生成する。


##例外
アロケータオブジェクトの`alloc.allocate()`メンバ関数が[`bad_alloc`](/reference/new/bad_alloc.md)例外を送出する可能性がある。


##例
```cpp
#include <memory>
#include <iostream>
 
int main()
{
  std::shared_ptr<int> sp = std::allocate_shared<int>(
                              std::allocator<int>(), // メモリアロケータ
                              42); // コンストラクタの引数リスト

  if (sp) {
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
- [Clang, C++11 mode](/implementation#clang.md): 3.3
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.3.6
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): ??

