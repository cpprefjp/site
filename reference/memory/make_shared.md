#make_shared
```cpp
namespace std {
  template<class T, class... Args>
    shared_ptr<T> make_shared(Args...&& args);
}
```

class T に対する shared_ptr<T> を作成し返却する。
このとき、args で受け取った引数リストを T の作成時コンストラクタへ渡して作成する。

shared_ptr<T>(new T(args...)); という方法でも構築できるが、これは作成時のメモリ確保が2回行われることから
オーバーヘッドが大きくなるという欠点がある。
make_shared はそこを制御し、1つの大きなブロックとして shared_ptr 構築に必要なメモリを確保する。

またコピー不可能なクラスも rvalue reference によって引数リストへ渡すことが可能である。

<b>コード例</b>
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

<b>実行例</b>
```cpp
42
```

ideone : [http://ideone.com/pSEkH](http://ideone.com/pSEkH)

<b>言語のバージョン</b>

C++11

<b>開発環境</b>

GCC 4.4 C++0x mode
Visual C++ 10.0

備考
VIsual C++ 10.0 でも使用可能だが、<b><color=ff0000>Variadic Templates に対応していない</color></b>ため、
オーバーロードにより、最大10個の引数を受け取れる形で make_shared は実装されている。
