#operator=
```cpp
pair& operator=(const pair& p);               // (1)

template <class U, class V>
pair& operator=(const pair<U, V>& p);         // (2)

pair& operator=(pair&& p) noexcept(下記参照); // (3) C++11

template <class U, class V>
pair& operator=(pair<U, V>&& p);              // (4) C++11
```

##概要
- (1) : 同じ型の`pair`をコピー代入する
- (2) : 変換可能な`pair`をコピー代入する
- (3) : 同じ型の`pair`をムーブ代入する
- (4) : 変換可能な`pair`をムーブ代入する


##要件
- (1) : [`is_copy_assignable`](/reference/type_traits/is_copy_assignable.md)`<first_type>::value && `[`is_copy_assignable`](/reference/type_traits/is_copy_assignable.md)`<second_type>::value`であること
- (2) : [`is_assignable`](/reference/type_traits/is_assignable.md)`<first_type&, const U&>::value && `[`is_assignable`](/reference/type_traits/is_assignable.md)`<second_type&, const V&>::value`であること
- (3) : [`is_move_assignable`](/reference/type_traits/is_move_assignable.md)`<first_type>::value && `[`is_move_assignable`](/reference/type_traits/is_move_assignable.md)`<second_type>::value`であること
- (4) : [`is_assignable`](/reference/type_traits/is_assignable.md)`<first_type&, U&&>::value && `[`is_assignable`](/reference/type_traits/is_assignable.md)`<second_type&, V&&>::value`であること


##効果
- (1), (2) : `p.first`を`this->first`に、`p.second`を`this->second`にコピー代入する
- (3), (4) : `p.first`を`this->first`に、`p.second`を`this->second`にムーブ代入する


##戻り値
`*this`


##例外
- (3) : `is_nothrow_move_assignable<first_type>::value && is_nothrow_move_assignable<second_type>::value`である場合、この関数は例外を決して投げない


##例
```cpp
#include <iostream>
#include <utility>
#include <string>

template <class T1, class T2>
void print(const std::string& name, const std::pair<T1, T2>& p)
{
  std::cout << name << " : (" << p.first << "," << p.second << ")" << std::endl;
}

int main()
{
  // コピー代入
  {
    std::pair<int, std::string> p(1, "abc");
    std::pair<int, std::string> p1;
    p1 = p;
    print("p1", p1);
  }

  // 変換可能なpairのコピー代入
  {
    std::pair<int, const char*> p(1, "abc");
    std::pair<int, std::string> p2;
    p2 = p;
    print("p2", p2);
  }

  // ムーブ代入
  {
    std::pair<int, std::string> p(1, "abc");
    std::pair<int, std::string> p3;
    p3 = std::move(p);
    print("p3", p3);
  }

  // 変換可能なpairのムーブ代入
  {
    std::pair<int, const char*> p(1, "abc");
    std::pair<int, std::string> p4;
    p4 = std::move(p);
    print("p4", p4);
  }

}
```

###出力
```
p1 : (1,abc)
p2 : (1,abc)
p3 : (1,abc)
p4 : (1,abc)
```

##バージョン
###言語
- C++11 : (3), (4)

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [GCC, C++0x mode](/implementation.md#gcc): 4.6.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照
