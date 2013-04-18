#operator=
```cpp
pair& operator=(const pair& p);

template<class U, class V> pair& operator=(const pair<U, V>& p);

pair& operator=(pair&& p) noexcept(下記参照);
template<class U, class V> pair& operator=(pair<U, V>&& p);
```

##概要

<li>`pair& operator=(const pair& p);`同じ型の`pair`をコピー代入する。要件： `[is_copy_assignable](/reference/type_traits/is_copy_assignable.md)<first_type>::value && [is_copy_assignable](/reference/type_traits/is_copy_assignable.md)<second_type>::value`であること効果： `p.first`を`this->first`に、`p.second`を`this->second`にコピー代入する戻り値： `*this`
</li><li>`template<class U, class V> pair& operator=(const pair<U, V>& p);`変換可能な`pair`をコピー代入する。要件： `[is_assignable](/reference/type_traits/is_assignable.md)<first_type&, const U&>::value && [is_assignable](/reference/type_traits/is_assignable.md)<second_type&, const V&>::value`であること効果： `p.first`を`this->first`に、`p.second`を`this->second`にコピー代入する戻り値： `*this`
</li><li>`pair& operator=(pair&& p) noexcept(下記参照);`同じ型の`pair`をムーブ代入する例外： `is_nothrow_move_assignable<first_type>::value && is_nothrow_move_assignable<second_type>::value`である場合、この関数は例外を決して投げない要件： `[is_move_assignable](/reference/type_traits/is_move_assignable.md)<first_type>::value && [is_move_assignable](/reference/type_traits/is_move_assignable.md)<second_type>::value`であること効果： `p.first`を`this->first`に、`p.second`を`this->second`にムーブ代入する戻り値： `*this`
</li><li>`template<class U, class V> pair& operator=(pair<U, V>&& p);`変換可能な`pair`をムーブ代入する要件： `[is_assignable](/reference/type_traits/is_assignable.md)<first_type&, U&&>::value && [is_assignable](/reference/type_traits/is_assignable.md)<second_type&, V&&>::value`であること効果： `p.first`を`this->first`に、`p.second`を`this->second`にムーブ代入する戻り値： `*this`
</li>


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
* =[color ff0000]
* =[color ff0000]
* =[color ff0000]

###出力

```cpp
p1 : (1,abc)
p2 : (1,abc)
p3 : (1,abc)
p4 : (1,abc)
```

##バージョン


###言語


- C++11 : operator=(pair&&), operator=(pair<U, V>&&)



###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): ??
- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??<h4>備考</h4>
(処理系やライブラリのバグや不完全な実装などをここに書く。なければ備考欄を削除)



##実装例

```cpp
```

##参照
```