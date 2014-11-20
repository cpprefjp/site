#decay (C++11)
```cpp
namespace std {
  template <class T>
  struct decay {
    typedef … type;
  };
}
```

##概要
型`T`に対して関数テンプレートと同じ規則で推論した型を取得する。


##効果
[`remove_reference`](./remove_reference.md)`<T>::type`した型を`U`とする。  
型`U`が配列型`U[N]`であれば、`U*`型をメンバ型`type`として定義する。  
型`U`が関数型`R(Args...)`であれば、`R(*)(Args...)`型をメンバ型`type`として定義する。  
それ以外の場合は、[`remove_cv`](./remove_cv.md)`<U>::type`した型を、メンバ型`type`として定義する。  


##例
```cpp
#include <type_traits>

template <class T1, class T2>
struct my_pair {
  T1 first;
  T2 second;

  template <class U1, class U2>
  my_pair(const U1& a, const U2& b)
    : first(a), second(b) {}
};

template <class T1, class T2>
my_pair<T1, T2> my_bad_make_pair(const T1& a, const T2& b)
{
  return my_pair<T1, T2>(a, b);
}

template <class T1, class T2>
my_pair<
  typename std::decay<const T1>::type,
  typename std::decay<const T2>::type
>
  my_make_pair(const T1& a, const T2& b)
{
  return my_pair<
           typename std::decay<const T1>::type,
           typename std::decay<const T2>::type
          >(a, b);
}

int main()
{
  // コンパイルエラー！
  // 配列をコンストラクタの初期化子で初期化できない
//auto p = my_bad_make_pair("hello", "world");

  // OK
  // decltype(q) == my_pair<const char*, const char*>
  auto q = my_make_pair("hello", "world");

  // OK
  // decltype(a) == mu_pair<int, int>
  auto a = my_make_pair(3, 1);
  a.first = 2;
}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC, C++0x mode](/implementation.md#gcc): 4.4.7
- [Visual C++](/implementation.md#visual_cpp): ??


##参照
- [What is std::decay and when it should be used? - StackOverflow](http://stackoverflow.com/questions/25732386/what-is-stddecay-and-when-it-should-be-used)

