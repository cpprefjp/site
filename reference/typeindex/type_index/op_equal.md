#operator== (C++11)
* typeindex[meta header]
* std[meta namespace]

```cpp
bool operator==(const type_index& rhs) const noexcept;
```

##概要
等値比較を行う


##戻り値
`*target == *rhs.target`

※`target`は、`type_index`のメンバ変数として保持されている`type_info`オブジェクトへのポインタ(説明用)


##例外
投げない


##例
```cpp
#include <cassert>
#include <typeindex>

int main()
{
  std::type_index t1 = typeid(int);
  std::type_index t2 = typeid(int);
  std::type_index t3 = typeid(double);

  assert(t1 == t2);
  assert(t1 == typeid(int));
  assert(!(t1 == t3));
  assert(!(t1 == typeid(double)));
}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [GCC, C++0x mode](/implementation.md#gcc): 4.6.1

