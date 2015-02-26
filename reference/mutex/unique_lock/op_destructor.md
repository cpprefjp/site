#デストラクタ (C++11)
* mutex[meta header]
* std[meta namespace]

```cpp
~unique_lock();
```

##概要
ロックを手放す


##効果
```cpp
if (owns_lock()) {
  pm->unlock();
}
```
* owns_lock()[link ./owns_lock.md]

※`pm`はメンバ変数として保持している、ミューテックスオブジェクトへのポインタ


##例
```cpp
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照


