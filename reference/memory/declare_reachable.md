#declare_reachable
```cpp
namespace std {
  void declare_reachable(void* p);
}
```

##概要
ポインタが到達可能であることを宣言する。

##要件
ポインタ`p`がSafely-derived Pointer（※）か、またはnullである。

##効果
`p`が非nullである場合、`p`の参照するオブジェクトは到達可能であるとされる。
到達可能であるということは、万一どのポインタも`p`を参照しないことがあってもGCにより解放されることはなくなる。
すなわち、GCにおいてルートとして機能する。

##戻り値
なし

##例外
システムが渡されたオブジェクトを追跡するのに必要な追加メモリを確保するのに失敗した場合、
`std::bad_alloc`を送出する。

##例
```cpp
#include <memory>
#include <iostream>
#include <cstdlib>

// GC負荷が大きい関数のダミー定義
void some_operation_that_cause_gc() {}

int main()
{
  int* p = new int(100);
  std::declare_reachable(p);
  // `p`の参照するオブジェクトは到達可能と宣言されているので、
  // ポインタ`p`の値が変わっても元の`p`が参照していたオブジェクトは解放されない
  p += 10;

  // `std::declare_reachable(p)`がない場合、
  // 次のGC負荷が大きい関数呼び出しで、`p`が参照していたオブジェクトを解放される可能性がある
  some_operation_that_cause_gc();

  std::cout << *(p - 10) << std::endl;

  p -= 10;
  std::undeclare_reachable(p);

  return EXIT_SUCCESS;
}
```

###出力
```
100
```

##バージョン
###言語
- C++11

###処理系
- GCC: ?
- Clang(libc++): 3.4 relaxed実装
- Intel: ?
- Visual C++: 2013 relaxed実装

##参照
* [C++0x ガベージコレクションと到達可能性ベースリーク検知の最小支援 - Faith and Brave - C++で遊ぼう](http://faithandbrave.hateblo.jp/entry/20081117/1226913980)
* [N2670: Minimal Support for Garbage Collection and Reachability-Based Leak Detection (revised)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2670.htm)
* [Garbage Collection ABI - C++ FAQ - www.stroustrup.com](http://www.stroustrup.com/C++11FAQ.html#gc-abi)
